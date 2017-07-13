Kaylee
======

The goal of Kaylee is

* A file is uploaded to an FTP site.
    * Authentication needed. Unknown whether it is ok for me to just have a username and password. As long as the file has proper permissions it should not be a problem. Make it only readable by those who need it.
* Copy that file locally.
* Move that file to a "processsed" directory in the FTP site.
    * THIS MEANS I NEED WRITE PERMISSIONS. SCARY
* Decrypt the file. We need a private key path configured.
    * WE ALSO NEED THE PASSPHRASE TO DECRYPT. SCARY
* Get a page count of the PDF file.
* Create a text file with the filename and the number of pages. We will call this `preflignt.txt`.
    * Filename Format: `securian-b29-<timestamp>.txt`
* Copy `preflight.txt` to "multiple directories" that should be configured.
* Copy the decrypted PDF to a directory on the laser share. (A destination which is configurable).

Example Config File (yaml)
--------------------------

    source:
        -
            path: ftp://blah
            username: usr1
            password: pass1
            decrypt:
                secretPath: /root/secret-key
                password: pass1
            remove: true
            consumed:
                -
                    path: ftp://blah/consumed
                    username: usr1
                    password: pass1
            destination:
                -
                    path: /lasr/drive
                    username: usr1
                    password: pass1

Error Scenarios
---------------

Chat with Adam about this. What do we want to error on? How specific do we want the errors?

We discussed an email being sent which is configurable.

