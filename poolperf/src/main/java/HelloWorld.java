import io.javalin.Javalin;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;

import static java.lang.Thread.sleep;

public class HelloWorld {
    public static void main(String[] args) {

        PoolingHttpClientConnectionManager pool = new PoolingHttpClientConnectionManager();
        pool.setDefaultMaxPerRoute(20);
        pool.setMaxTotal(200);
        final CloseableHttpClient httpclient = HttpClients.custom().setConnectionManager(pool).build();

        final String url = "http://localhost:7000/outlookanywhere";



        Javalin app = Javalin.create().start(7000);
        app.get("/", ctx -> ctx.result("Hello World"));
        app.get("/xmlrpc", ctx -> {
            // some code
            try {
                HttpGet httpGet = new HttpGet(url);
                CloseableHttpResponse response = httpclient.execute(httpGet);
                HttpEntity entity = response.getEntity();
//                responseContent = EntityUtils.toString(entity, encoding);
                String rr =  EntityUtils.toString(entity);
                //https://stackoverflow.com/questions/15969037/why-did-the-author-use-entityutils-consumehttpentity
                EntityUtils.consume(entity);
                response.close();   // do we need it?

                ctx.result(rr);
            } catch (Exception e) {
                e.printStackTrace();
            }


        });

        app.get("/outlookanywhere", ctx -> {
            // some code
            int stotal = 2000;
            sleep(stotal);
            String rs = "outlookanywhere: after some sleep: " + stotal + " ms";
            ctx.result(rs);
        });
    }
}