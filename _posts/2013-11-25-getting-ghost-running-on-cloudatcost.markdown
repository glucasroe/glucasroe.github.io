---
layout: post
title: Getting Ghost Running on CloudatCost
date: '2013-11-25 17:00:00'
---

The first time that I tried this, I had to ping back and forth between 4 or 5 tutorials to get this all figured out. I screwed up my upgrade though, so I figured that I would take a chance to download everything and start afresh. I am using a Mac, so some of these things will be Mac specific.

I'm pulling this from a few sources, and in some places it will be whole cloth from those sources. I will credit them whenever I remember to, but here's a list of them right up at the top

- http://www.howtoinstallghost.com/how-to-install-ghost-on-centos-server-6-4/
- https://support.eapps.com/index.php?/Knowledgebase/Article/View/438/55/user-guide---installing-the-centos-development-tools-gcc-flex-etc
- http://www.howtoinstallghost.com/how-to-install-ghost-on-centos-server-6-4/
- http://docs.ghost.org/mail/
- http://www.howtoinstallghost.com/how-to-start-ghost-with-forever/

## 1. Image your system using CentOS

This is simply because it is what I can find the most references for, and it seems pretty standard. You can set this up either at your initial login screen, or you can do this from your panel.cloudatcost login. Keep this browser window open, as you will need the password and IP information provided. Note, the password is separate from your panel or login password

## 2. SSH into your server

In a terminal window, connect to your host with the following command

    
```language-bash
ssh root@YOUR.IP.ADDRESS.HERE
```

It will ask you to confirm the RSA authenticity. Tell it yes. (If you have reimaged your server, it's not going to let you connect if you have strict checking. You can fix this by deleting the known\_hosts file on your local computer at 

```language-bash
/Users/YOURUSERNAME/.ssh/known_hosts  
```

**Note**: SSH folder is hidden)

## 3. Getting CentOS ready.

### a. Update CentOS (5-10 minutes)

```language-bash
su -c "yum update"
```
### b. Install Development Tools (5-10 minutes)

```language-bash
yum clean all
yum groupinstall "Development tools"
```

## 4. Downloading and installing Node.js
 a. When you SSH into your server, it drops you in a bit of a weird place. Lets start at the top.

```language-bash
cd /
```

### b. Grab a URL for the most recent version of Node. 
You can find it on this page: http://nodejs.org/download/ and look for the "Source Code" button. Right click it and copy the link, you'll use it here. Do not use mine, it might be outdated by the time you read this. (Newbie **Note**: Once it's downloaded, you can autocomplete the file names by just tapping the tab key after you type a few letters.)

```language-bash
wget http://nodejs.org/dist/v0.10.22/node-v0.10.22.tar.gz
tar -xzf node-v0.10.22.tar.gz
cd node-v0.10.22
```

### c. Compile and Install Node 
(10-15 minutes. "make" takes forever, make install takes 3/4 of a second)

```language-bash
./configure
make
make install
```

## 5. Download and Install Ghost

First, we'll make the www folder which will host our install folder.

```language-bash
cd /
mkdir www
cd www
```

This next part is a little bit tricky. We're going to try and download the ghost zip from the servers, but the protocols don't handle redirects well. I accidentally discovered a little trick for getting to the end of the redirect loop using cURL. First, try to download the zip from the url that Ghost gives you. (Again, it was 0.3.3 when I created this, please find the newest download at https://ghost.org/download/) 

**ALSO NOTE**: this flag is a capital O, not a 0 (zero)

```language-bash
curl -O https://ghost.org/zip/ghost-0.3.3.zip
```

If it downloads in under a second, it probably didn't work. You can try unzipping it just to check

```language-bash
unzip -d ghost ghost-0.3.3.zip
```

I get an error message that starts "End of central directory signature not found", yadda yadda. Here's what happened, you downloaded a 301 redirect page. Lets try cURLing it again with no parameters.

```language-bash
curl https://ghost.org/zip/ghost-0.3.3.zip
```

I get the following message

```language-bash
<html><body>You are being <a href="http://d36u7lo2kegj1p.cloudfront.net/archives/ghost-0.3.3.zip">redirected</a>.</body></html>
```

So now I'll try to download that:

```language-bash
curl -O http://d36u7lo2kegj1p.cloudfront.net/archives/ghost-0.3.3.zip
```

It took me one more cycle to actually get it to download correctly with this link: https://ghost.org/archives/ghost-0.3.3.zip

**NOTE**: If you try to curl without the -O and you get the actual zip file, you're going to get a massive string of characters and your machine will probably start making alert sounds at you for about 30 seconds. Don't freak, you aren't breaking anything, that means that you've actually found the zip instead of another 301 redirect.

Ok, so you've successfully unzipped ghost! Lets hop on in there:

```language-bash
cd ghost
npm install --production
```

This takes about a minute to install.

## 6. Configuring Ghost 
(This is taken directly from http://www.howtoinstallghost.com/how-to-install-ghost-on-centos-server-6-4/)

```language-bash
cp config.example.js config.js
nano config.js
```

Change all examples of host: 

```language-bash
’127.0.0.1′,
port: ’2368′
```

to

```language-bash
host: ’0.0.0.0′,
port: ’80′
```

Also, make sure that you set your URLs. Save it out with ctrl+x. Hit y to confirm save and enter to confirm filename overwrite.

Test your installation by going to your URL that you set. The terminal will spit out a ton of text, and your browser should display your blog, huzzah! Now lets make sure that ghost won't shut down when you close your terminal window. I used "forever" for this. First, shut down your ghost blog by hitting ctrl+c.

## 7. Making ghost run FOREVER 
(Kinda, unless you break it)

First we have to install forever, then we can tell it what to run. Make sure you're still in the ghost directory, and then install forever

```language-bash
npm install -g forever
NODE_ENV=production forever start index.js
```

And you should be live!

Lets go set up your blog.    

```language-bash
http://yourblogurl.com/ghost
```

Set up a username and password and stuff. You could just zoom forward from here, but you may notice a banner at the top "Ghost is attempting to use your servers sendmail." It's a good idea to set this up so it can send you your password and stuff if you forget. Let's go do that.

## 8. Sendmail configuration 
(Adapted from here: http://docs.ghost.org/mail/)

First, let's stop forever from processing the ghost file so that we can make changes to it

```language-bash
forever stop index.js
```

Now, on getting an email address, FOR THE LOVE ALL ALL THAT IS GOOD, DO NOT USE YOUR PRIMARY EMAIL ADDRESS. Why? Because you're about to type that password into this js file, and you don't want people compromising your email. Go to mailgun and setup an account. You're going to need your SMTP Authentication information for the following steps.

```language-bash
nano config.js
```

Scroll through this until you find your **production** settings, not your development settings. Inside of the "mail{}", paste the following:


```language-bash
transport: 'SMTP',
options: {
    service: 'Mailgun',
    auth: {
        user: 'postmaster@yoururl.com',
        pass: 'randomhashofletters'
    }
}
```

Note: there will be another curly brace hanging off the end because it's the close brace for the mail function. After you've entered your settings, go ahead and save it with ctrl+x. Then, you can restart ghost again with the following

```language-bash
NODE_ENV=production forever start index.js
```

Happy trails!