Aprroach:

1. Create an Apex controller that retrieves a list of contacts:
● Class: ContactController
● Method: getContacts()
● Fields to query: FirstName, LastName, Email

2. Create a Lightning web component that displays contacts in a table:
● Component name: contactList
● Base component: lightning-datatable
● Fields to include: FirstName, LastName, Email

3. Add the component to a new App page.

Functionalities Covered:

1. showing contact records in lightning datatable on app page.
2. pagination with the option to choose the record size to display on each page of the datatable.
3. search box to search for a specific records.
4. sorting feature for all 3 columns to sort the records.
5. I have sused with sharing in the apex class to enofrce the OWD and same as been covered in the test class and the code coverage is 100%.

Steps to add the LWC component to page layout:

NOTE: as I have set the target in the LWc xml to app_Page and home_page. we wont need any additional configuration from component side.
1. go to the respective app page -> click setup icon -> choose 'Edit Page' -> app builder page of that app will open.
2. while the app builder page is getting loded go back to the VSCode -> open 'contactList' LWC component -> open meta xml file -> copy the master label 'Contact DataTable' -> go back to app page.
3. in the app page there will be an search icon to your left side -> paste this master label name 'Contact DataTable' -> you will see a component with this name under 'custom.
4. drag the component and place it on the home page as per you required position.
5. Click save -> once you get changes saved -> click Activation -> an pop up will come with 3 options in that choose 'App Default' option -> click Assign Apps -> select the apps on which you want to show this data table -> Click save.
6. once you get activation succesfull message before the save button on top right corner - click save again for safer side -> click back arrow available next to the top left corner.
7. check the apps for which you have assigned this data table for visibility.

I have added a screen capture in the zip file which includes these steps as well as the component behaviour.

Other Apporoaches:

Instead of making it one object specific we could have made this component reusabel for different objects so, that in future if any such requirements comes up we can directly use that reusable component by passing parameters like object name, fields query, sorting type, search filter. this approach will be more usefull and avoids future development efforts.

I would like to demo this reusable component apporach if I get a chance for presentation round :)


