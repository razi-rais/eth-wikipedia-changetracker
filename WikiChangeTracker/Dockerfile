FROM ubuntu:16.04

LABEL maintainer="Razi Rais"

RUN apt-get update \
&& apt-get install python -y \
&& apt-get install python-pip -y \
&& pip install requests \
&& pip install sseclient

COPY trackchanges.py  trackchanges.py

ENTRYPOINT ["python", "trackchanges.py"]
