FROM ubuntu:20.04

# อัปเดต package และลง package ที่จำเป็นสำหรับการใช้งาน
RUN apt-get update && \
    apt-get install -y \
        curl \
        wget \
        gnupg \
        apt-transport-https \
        ca-certificates \
        vim \
        nano \
        software-properties-common

# ค่า ENV สำหรับสิ่งที่ใช้งานบ่อยๆ ในการทำงานกับ Docker container
ENV DEBIAN_FRONTEND noninteractive
ENV LANG C.UTF-8

# เปลี่ยน working directory เป็น /app
WORKDIR /app

# ลบ package ที่ไม่ได้ใช้งานออกเพื่อลดขนาด image
RUN apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# รันคำสั่ง default ที่จะทำเมื่อ container ถูกสร้าง
CMD ["/bin/bash"]
