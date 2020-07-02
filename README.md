# UI as a Service - Plugin

'UI as a Service' provides both dynamic User Interfaces and static content. This front-end layer helps to decouple the back-end layer.
The output of this project is a plugin (i.e. JAR file) which contains all the Thymeleaf UI templates, images, SASS, JS and other 
resources that necessary to create a complete user interfaces for a given application (e.g. WAPP Web).

# Technologies:
* HTML
* Thymeleaf
* JavaScript
* XML
* CSS
* SASS
* GIT

## Installation

>
> Step 1
>
You can clone the project [link](http://gitlab.intervest.lk/avanti/ui-as-a-service.git) using Intellij IDEA.
E.g.  File -> New -> Project from Version Control...

>
> Step 2
>
Need to install Enonic XP platform. Please follow following installation guide.
https://developer.enonic.com/start

>
> Step 3
>
Before project starts, need to setup following configuration file

```bash
cd ~/.enonic/sandboxes/<YOUR-SANDBOX-NAME>/home/config
```

create a file inside config directory, 
   
```bash
touch com.intervest.wapp.web.cfg
```
 
add following content in to it

 ```bash
 auth_server=https://coredev00.wapp.com/auth
 api_server=https://coredev00.wapp.com/core
 cms_server=http://localhost:8080
```

>
> Step 4
>
Once you complete the Step 2, go to the ui-as-a-service project folder
and execute following commands. 

```bash
enonic project deploy
```

Once server started, you can access the content in http://localhost:8080/admin/tool

>
> Step 5
>
* Go to the Content Studio View
* Create a folder "Travel Insurance"
* Create a new "Site" inside the "Travel Insurance" and name it as "Wapp Web"
* Now create a "Landing page" inside "Wapp Web" and name it as "Signin"
NOTE: When creating a "Landing page", don't forget to provide the same name that appears in the "Parts" drop down list.

# firstatryappenonic
