#!/bin/bash
set -e

if [ "$1" = 'postgres' ]; then
    chown -R postgres "$PGDATA"

    if [ -z "$(ls -A "$PGDATA")" ]; then
        gosu postgres initdb
    fi

    exec gosu postgres "$@"
fi

exec "$@"

#main
echo "start to run catalina"
catalina.sh run


deploy_mysql() {
	tar -xzf $INSTALL_PATH/mysql.tar.gz -C $INSTALL_PATH
	rm $INSTALL_PATH/mysql.tar.gz
	
	chown -R dualshield:dualshield $INSTALL_PATH/mysql

	chmod 777 $INSTALL_PATH/tools/dualsql.sh
	
#	chmod a+x scripts/mysql_install_db
#	chmod a+x support-files/mysql.server
#	echo "Executing mysql_install_db . . ."

#	$INSTALL_PATH/mysql/scripts/mysql_install_db --defaults-file=$INSTALL_PATH/mysql/dual.cnf --basedir=$INSTALL_PATH/mysql --user=dualshield >/dev/null

	echo "Initialize MySQL data directory"
	$INSTALL_PATH/mysql/bin/mysqld --defaults-file=$INSTALL_PATH/mysql/dual.cnf --initialize-insecure --user=dualshield >/dev/null 2>&1


#	cp support-files/mysql.server /etc/init.d/dualsql
	echo "Preparing dualsql daemon working after reboot"
	
	cp -p $INSTALL_PATH/tools/dualsql.sh /etc/init.d/dualsql
	/etc/init.d/dualsql start
	
	if [ -x "/sbin/chkconfig" ]; then
		/sbin/chkconfig --add dualsql >/dev/null 2>&1
	else
		update-rc.d dualsql defaults 88 >/dev/null 2>&1
	fi

}

# back end, get the files, organize them in Dockerfile
finalize_dualshield() {

    #get the folder of the running script
    BASEDIR=$deepnet.packagerunningpath
    #echo "Package running from the folder = $BASEDIR"
    #extract the java at installer running folder to // $INSTALL_PATH/jre

    if [ "`uname -s | grep SunOS`" ]; then
        gtar xzf "$BASEDIR"/jre.tar.gz -C $INSTALL_PATH
    else
        tar xzf "$BASEDIR"/jre.tar.gz -C $INSTALL_PATH
    fi



    #move the jce jar to replace the original one, radius doesn't need there jars
    if [ -e "$INSTALL_PATH/jre/local_policy.jar" ]; then
        mv $INSTALL_PATH/jre/local_policy.jar $INSTALL_PATH/jre/lib/security
        mv $INSTALL_PATH/jre/US_export_policy.jar $INSTALL_PATH/jre/lib/security
    fi
    #change security context which is nessary on SELinux for Fedora and CentoOS, reboot
    chcon -t textrel_shlib_t $INSTALL_PATH/jre/lib/i386/server/libjvm.so >/dev/null 2>&1

    #may need to change the owner
    chmod a+x $INSTALL_PATH/tools/addhost.sh
    chmod a+x $INSTALL_PATH/tools/genkey4twitter.sh
    chmod a+x $INSTALL_PATH/tools/finalizetomcat.sh

    chmod a+x $INSTALL_PATH/Uninstaller/removedualshield.sh

    chmod a+x $INSTALL_PATH/bin/jsvc
    #chmod a+x $INSTALL_PATH/bin/makensis
    chmod a+x $INSTALL_PATH/bin/dualtomcat.sh
    if [ -e "$INSTALL_PATH/tomcat/bin/libdascore.so" ]; then
        chmod a+x $INSTALL_PATH/tomcat/bin/libdascore.so
    fi

    #change home folder for the user dualshield
    if [ "`uname -s | grep SunOS`" ]; then
        echo ""
    else
        usermod -d $INSTALL_PATH dualshield
    fi

    #for report function in linux 
    mkdir -m a+rw $INSTALL_PATH/export
    chown -R dualshield:dualshield $INSTALL_PATH/export/

    #change owner, at least the certs sub folder
    chown -R dualshield:dualshield $INSTALL_PATH/certs/
    chown -R dualshield:dualshield $INSTALL_PATH/config/
    chown -R dualshield:dualshield $INSTALL_PATH/bin/

#cp $INSTALL_PATH/bin/dualradius.sh /etc/init.d/

}

populate_server_xml() {

}

alter_hosts_file() {

}
# https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line
replace_fqdn() {
    grep -RiIl 'search' | xargs sed -i 's/search/replace/g'
    echo "Replace server FQDN"

    files=`ls /usr/local/config/*`

    for file in ${files}; do
        sed -i "s/dualshield.deepnetsecurity.com/${DUALSHIELD_FQDN}/g" $file
    done

    sed -i "s/dualshield.deepnetsecurity.com/${DUALSHIELD_FQDN}/g" /usr/local/tomcat/conf/server.xml

}

//https://gist.github.com/granella/01ba0944865d99227cf080e97f4b3cb6
create_certs() {
    #lib/security/cacerts
    keytool -genkeypair -alias ultimateca -dname "cn=Local Network - Development" -validity 12000 -keyalg RSA -keysize 2048 -ext bc:c -keystore /usr/local/certs -keypass changeit -storepass changeit

}