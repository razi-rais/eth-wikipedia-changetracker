
FROM ubuntu:16.04

LABEL maintainer="Razi Rais"

RUN apt-get update \
&& apt-get install python -y \
&& apt-get install python-pip -y \
&& apt-get install unixodbc-dev -y \
&& pip install Flask-API \
&& pip install flask \
&& pip install flask_cors \
&& pip install requests \
&& pip install pyodbc

COPY items.py items.py

##########################################################
#Install Microsoft ODBC driver 13 for SQL. https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
RUN apt-get -y install sudo
RUN sudo su
RUN apt-get install curl -y
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN exit
RUN sudo apt-get install apt-transport-https -y
RUN sudo apt-get update
RUN ACCEPT_EULA=Y apt-get install -y  msodbcsql=13.0.1.0-1 mssql-tools=14.0.2.0-1
RUN apt-get install unixodbc-dev-utf16 -y  #this step is optional but recommended*
#Create symlinks for tools
RUN ln -sfn /opt/mssql-tools/bin/sqlcmd-13.0.1.0 /usr/bin/sqlcmd
RUN ln -sfn /opt/mssql-tools/bin/bcp-13.0.1.0 /usr/bin/bcp
# install necessary locales
RUN apt-get install -y locales \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
    && locale-gen
##########################################################

ENTRYPOINT ["python", "items.py"]
