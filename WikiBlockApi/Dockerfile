FROM ubuntu:16.04

LABEL maintainer="Razi Rais"

RUN apt-get update \
&& apt-get install python -y \
&& apt-get install python-pip -y \
&& pip install Flask-API \
&& pip install flask \
&& pip install flask_cors \
&& pip install web3

COPY WikiBlockApi.py WikiBlockApi.py

ENTRYPOINT ["python", "WikiBlockApi.py"]
