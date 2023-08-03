
describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');
       //System finds modal for creating issue and does next steps inside of it
       cy.get('[data-testid="modal:issue-create"]').within(() => {


        //Type value to description input field
        cy.get('.ql-editor').type('timetracking assignment 2');

        //Type value to title input field
        cy.get('input[name="title"]').type('TimeIsMoney');

        //Click on button "Create issue"
        cy.get('button[type="submit"]').click();
    });
    cy.wait(11000);
    cy.reload();
    //Click on the "TimeisMoney" issue
    cy.contains('TimeIsMoney').click();

    //Add estimation 10h
    cy.get('input[placeholder*="Number"]').type('10');

    cy.contains('10h estimated').should('be.visible');
      });
    });

    it('Should create an issue and validate it successfully', () => {
        
        //Close and reopen the "TimeIsMoney" issue
        cy.get('[data-testid="icon:close"]').click();
        cy.contains('TimeIsMoney').click();


        //Assert that estimation is added and visible
        cy.contains('10h estimated').should('be.visible');

        //Edit estimation to 8h
        cy.get('input[placeholder*="Number"]').clear().type('8');

        cy.contains('8h estimated').should('be.visible');

        //Close and reopen the "TimeIsMoney" issue
        cy.get('[data-testid="icon:close"]').click();
        cy.contains('TimeIsMoney').click();


        //Assert that updated value is visible
        cy.contains('8h estimated').should('be.visible');

        //Remove estimation time and assert that value is removed
        cy.get('input[placeholder*="Number"]').clear();
        cy.contains('8h estimated').should('not.exist');

        //Close and reopen the "TimeIsMoney" issue and assert again that value is removed 
        cy.get('[data-testid="icon:close"]').click();
        cy.contains('TimeIsMoney').click();
        cy.contains('8h estimated').should('not.exist');







    });

    it('Time logging functionality', () => {

       //Click and assert that time tracking pop-up dialogue is opened
        cy.get('[data-testid="icon:stopwatch"]').click(); 
        cy.get('[data-testid="modal:tracking"]').should('be.visible');

        //Enter values to "Time spent"&"Time remaining" fields and click button "Done"
        cy.get('input[placeholder*="Number"]').eq(1).type('2');
        cy.get('input[placeholder*="Number"]').eq(2).type('5');
        cy.contains("button", "Done").click();

        //Assert that Spent time number is visible, "No Time Logged" label is no longer visible,
        //User sees added time remaining value instead of original estimation in the time tracking section
        cy.contains('2h logged').should('be.visible');
        cy.contains('No time logged').should('not.exist');
        cy.contains('5h remaining').should('be.visible');
        cy.contains('10h estimated').should('not.exist');

        //Remove logged time
        cy.get('[data-testid="icon:stopwatch"]').click(); 
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('input[placeholder*="Number"]').eq(1).clear();
        cy.get('input[placeholder*="Number"]').eq(2).clear();
        cy.contains("button", "Done").click();

        //Assert that spent time number is removed and original estimation time is in time tracking section
        cy.contains('2h logged').should('not.exist');
        cy.contains('No time logged').should('be.visible');
        cy.contains('5h remaining').should('not.exist');
        cy.contains('10h estimated').should('be.visible');










    });

});
