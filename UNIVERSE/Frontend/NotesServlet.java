import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class NotesServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        RequestDispatcher rd = req.getRequestDispatcher("index.jsp");
        rd.forward(req, res);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        String token = req.getParameter("token");
        String courseId = req.getParameter("course");
        String filename = req.getParameter("filename");

        URL url = new URL("http://localhost:3000/notes/init-upload");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Bearer " + token);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        String payload = String.format(
            "{\"course_id\":%s,\"filename\":\"%s\"}",
            courseId, filename
        );

        try (OutputStream os = conn.getOutputStream()) {
            os.write(payload.getBytes());
        }

        res.sendRedirect("index.jsp");
    }
}
