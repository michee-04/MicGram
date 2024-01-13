declare module 'appwrite' {
    export class Query {
       // ...autres méthodes Query
   
       static cursor(cursor: string): string;
    }
   }