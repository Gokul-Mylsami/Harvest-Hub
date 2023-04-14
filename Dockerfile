FROM ubuntu:20.04

# Install Apache and PHP
ENV TZ=UTC
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y apache2 libapache2-mod-php php php-mysql && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    apt-get install -y mysql-server && \
    rm -rf /var/lib/apt/lists/*

# Copy application files to container
COPY . /var/www/html/

# Enable Apache rewrite module
RUN a2enmod rewrite

# Expose port
EXPOSE 80 3306

# Start Apache in the foreground
CMD ["bash", "-c", "/etc/init.d/mysql start && apachectl -D FOREGROUND"]
