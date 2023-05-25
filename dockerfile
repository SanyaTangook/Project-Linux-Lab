FROM node:16.8.0-alpine

ARG ssh_pub_key

RUN mkdir -p /root/.ssh \
    && chmod 0700 /root/.ssh \
    && passwd -u root \
    && echo "$ssh_pub_key" > /root/.ssh/authorized_keys \
    && apk add openrc openssh \
    && ssh-keygen -A \
    && echo -e "PasswordAuthentication no" >> /etc/ssh/sshd_config \
    && mkdir -p /run/openrc \
    && touch /run/openrc/softlevel

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

ENTRYPOINT ["sh", "-c", "rc-status; rc-service sshd start; yarn start"]