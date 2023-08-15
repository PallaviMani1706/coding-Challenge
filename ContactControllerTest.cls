/*
 * Created for: unite testing ContactController class
 */
@isTest
public class ContactControllerTest {
    
  @testSetup
    static void setupTestData() {
        List<Contact> testContacts = new List<Contact>();
        for (Integer i = 0; i < 5; i++) {
            Contact c = new Contact(FirstName = 'TestFName' + i, LastName = 'TestLName' + i, Email = 'test' + i + '@mail.com');
            testContacts.add(c);
        }
        insert testContacts;
    }
    
   static testMethod void testGetContacts() {
       // Run as the current user
       Id userId = UserInfo.getUserId();
       User loggedInUser = [Select Id from User where Id=:userId];
       system.runAs(loggedInUser) {
        List<Contact> expectedContacts = [SELECT Id, FirstName, LastName, Email FROM Contact];
        test.startTest();
        List<Contact> resultContacts = ContactController.getContacts();
        System.assertEquals(expectedContacts.size(), resultContacts.size(), 'Number of contacts returned should match');
        test.stopTest();
       }
    }

}