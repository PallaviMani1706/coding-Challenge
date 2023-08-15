/*
 * Created for: fetching the contact records
 * Methods and its Parameter and return type:
 * 1. getContacts - to get the list of contacts
 *    Parameter: ''
 *    return type: List<Contact>
 * with sharing reason: to enforce organization-wide defaults and sharing rules that determine record visibility.
*/
public with sharing class ContactController {
 
 @AuraEnabled(cacheable=true)
 public static List<Contact> getContacts() {
    return [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT 50000];
 }
}