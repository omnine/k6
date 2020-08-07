# base iamge
FROM tomcat:9-jre8-slim

#https://serverfault.com/questions/796762/creating-a-docker-mysql-container-with-a-prepared-database-scheme

LABEL project="DualShield 5.9 image"
LABEL maintainer "nanoart@deepnetsecurity.com"

# Copy tomcat libs
COPY tomcat/lib/* /usr/local/tomcat/lib/

# Remove tcnative library, to avoid SSL client authentication error
RUN rm -rf /usr/local/tomcat/native-jni-lib/*



COPY docker-entrypoint.sh /usr/local/bin/
#COPY storeconf.xml

# mount point for host folder /opt/dualshield, to persist the data
#VOLUME /usr/local/dualshield


# Create a group and user
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Tell docker that all future commands should run as the appuser user
#USER appuser


# will unpack to
#ADD dualshiel_5.9.9.tar.xz /usr/local/dualshield

# Add certs folder, the corresponding certs should configurated
# allinone.pfx
# sso.jks
# sso.pfx
# cacert

RUN mkdir /usr/local/certs
#Add certs/allinone.pfx /usr/local/certs/allinone.pfx


#RUN keytool -importcert -trustcacerts -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit -alias dualshieldca -noprompt -file /tmp/dualshieldca.cer
#RUN keytool -importcert -trustcacerts -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit -alias "Deepnet CA" -noprompt -file /tmp/Deepnet_CA.cer
#RUN keytool -importkeystore -noprompt -srckeystore /tmp/dualultimateca.p12 -srcstoretype pkcs12 -srcstorepass changeit -srckeypass changeit -srcalias dualultimateca -destkeystore $JAVA_HOME/lib/security/cacerts -deststorepass changeit -destkeypass changeit -destalias dualultimateca

#RUN keytool -importkeystore -noprompt -srckeystore /tmp/dualultimateca.p12 -srcstoretype pkcs12 -srcstorepass 'deep&net1' -srckeypass 'deep&net1' -srcalias 1 -destkeystore $JAVA_HOME/lib/security/cacerts -deststorepass changeit -destkeypass changeit -destalias dualultimateca  

# Add app conf properties file
RUN mkdir /usr/local/config
COPY config/* /usr/local/config/

RUN mkdir /usr/local/export

#ADD libs/alpn-boot-8.1.13.v20181017.jar /usr/local/lib/alpn-boot-8.1.13.v20181017.jar
#ADD glowroot/ /usr/local/glowroot/

# Change server.xml and context.xml in the tomcat conf folder
COPY tomcat/context.xml /usr/local/tomcat/conf/
#COPY tomcat/server.xml /usr/local/tomcat/conf/
#COPY tomcat/tomcat-users.xml /usr/local/tomcat/conf/
#COPY tomcat/web.xml /usr/local/tomcat/conf/web.xml
#COPY tomcat/NotFound.jsp /usr/local/tomcat/webapps/ROOT/
#COPY tomcat/NotFound.jsp /usr/local/tomcat/ssoapp/ROOT/
#COPY tomcat/NotFound.jsp /usr/local/tomcat/dssapp/ROOT/
#COPY tomcat/NotFound.jsp /usr/local/tomcat/dualapp/ROOT/
#COPY tomcat/manager-context.xml /usr/local/tomcat/webapps/manager/META-INF/context.xml

# Copy SMS providers
#COPY smsproviders/* /usr/local/smsproviders/

# Copy wait-for-it
#COPY utils/wait-for-it.sh /bin/

# copy wars
#ADD wars/appsso.war /usr/local/tomcat/ssoapp/appsso.war
#ADD wars/dss.war /usr/local/tomcat/dssapp/dss.war
#ADD wars/dmc.war /usr/local/tomcat/webapps/dmc.war

#ADD wars/dds.war /usr/local/tomcat/dssapp/dds.war
#ADD wars/drp.war /usr/local/tomcat/dssapp/drp.war
#ADD wars/dea.war /usr/local/tomcat/dssapp/dea.war
#ADD wars/dua.war /usr/local/tomcat/dssapp/dua.war

#ADD wars/dsc.war /usr/local/tomcat/dssapp/dsc.war
#ADD wars/dac.war /usr/local/tomcat/webapps/dac.war
#ADD wars/sso.war /usr/local/tomcat/ssoapp/sso.war

#ADD wars/das5.war /usr/local/tomcat/dualapp/das5.war

# Copy modules
RUN mkdir /usr/local/modules
#COPY modules/* /usr/local/modules/

ENTRYPOINT ["./dualshield_entrypoint.sh"]
EXPOSE 8080
#CMD ["catalina.sh", "run"]
