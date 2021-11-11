# Web APP project : Ressources Managing Web App Star Wars
### IMPORTANT : versions to use the project :
Angular CLI: 12.2.5

Node: 14.17.6

Package Manager: npm 6.14.15

OS: linux x64

Loopback : 3

Maria DB :  10.5.9

## To import : 

               git pull https://github.com/CamilleTouron/RessourcesManagingWebAPP.git


## To excute localy: 
### 1 - Open a terminal in the repertory Dump :
                
                mysql -u root -p
                
                CREATE DATABASE rmwpst;
                
                ^c
                
                mysql -u <your_user_name> -p -h <your_hosting_number> rmwpst < CHASSEURS_2021-10-23_144132_ProjetStarWarsBDD.sql
                
                mysql -u <your_user_name> -p -h <your_hosting_number> rmwpst < PILOTES_2021-10-23_144232_ProjetStarWarsBDD.sql
                
                
                
### 2 - Open a terminal in the repertory ProjetStarWarsAPI :

                npm install loopback-connector-mysql --save
                
                node .
                        
### 3 - Open a second terminal (without closing the one with node) in the repertory ProjetStarWarsAPP :
                                
                npm install
                
                ng serve       
                
It will apear a sentence like : " Angular Live Development Server is listening on localhost:4200, open your browser on http ://localhost:4200/ ** " click on the " http ://localhost:4200/ " .

### 4 - Click on the header of the page and there it is you can use the Web APP localy. 

## Project's details :      
  Group of three persons.     
  In three days.  
  
