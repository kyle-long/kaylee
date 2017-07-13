Kaylee
======

The goal of Kaylee is

* A file is uploaded to an FTP site.
    * Authentication needed. Unknown whether it is ok for me to just have a username and password. As long as the file has proper permissions it should not be a problem. Make it only readable by those who need it.
* Copy that file to destinations.
    * In a real scenario:
        * we copy both the encrypted and decrypted versions to the laser drive. We also need a way in a destination path to specify variables.
        * The name must be the name of the file from the FTP site.
        * Both a decrypted and encrypted version of the file needs to be added to the laser drive.
        * Need to create a directory which doesn't exist which will have some sort of naming convention + a timestamp somehow. Specify with a variable?
* Decrypt the file. We need a private key path configured.
    * WE ALSO NEED THE PASSPHRASE TO DECRYPT. SCARY
* "Preflight file" created after the destinations are copied.
    * Get a page count of the PDF file.
    * Create a text file with the filename and the number of pages. We will call this `PREFLIGHT_FILE`.
        * Filename Format: `johndalar-b29-<timestamp(mm-dd-Y)>.txt`
    * Copy `PREFLIGHT_FILE` to "multiple directories" that should be configured.

Example Config File (yaml)
--------------------------

    # This is used for a desintation where decrypt is equal to true.
    defaultDecrypt:
        secretPath: /root/secret-key
        password: pass1
    source:
        -
            path: ftp://username:password@blah.com/lol/naming-.*-convention
            remove: true
            destination:
                -
                    path: \\fun\laser\johndalar-b29-<timestamp(mm-dd-Y)>
                    decrypt: true
                -
                    path: /lasr/drive/lol/encrypted
                -
                    path: \\lol\hi\thing\that\wont\happen
                    decrypt:
                        secretPath: /root/other-key
                        password: other-password
            preflight:
                -
                    path: \\something\ll-something\# preflights\linda\johndalar-b29-<timestamp(mm-dd-Y-hh)>

Additional Notes
----------------

Q: We discussed an email being sent which is configurable

A: We do not need to send an email. Just log what is required.\

---

Q: Error scenarios?

A: Log what we can.

---

Q: What happens if one of the desintations fail? Should we clean anything up.

A: Nothing. Leave it as is. People will have to check the logs.

---

Q: Can things run in parallel?

A: Sort of. Sources can run in parallel. Destinations can also run in parallel. The `PREFLIGHT_FILE` must be done after the destinations. The removal of the file from the FTP site must be done last.

---

FAIL QUICK if you can't read one private key.

---

SUPER IMPORTANT. MUST SUPPORT SPACES IN PATHS.
