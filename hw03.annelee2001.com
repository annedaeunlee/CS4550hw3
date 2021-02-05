server {
        listen 80;
        listen [::]:80;

        root /home/newuser/www/hw03.annelee2001.com/build;

        index index.html;

        server_name hw03.annelee2001.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
