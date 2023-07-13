


describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title
    cy.contains(issueTitle).click();
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';


  it('Should delete issue successfully', () => {
    //Delete issue and assert that deletion confirmation dialogue is not visible
    cy.get('[data-testid="icon:trash"]').click();
    cy.contains('button', 'Delete issue').click()
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    //Assert, that issue is deleted and not displayed on Jira board
    cy.contains(issueTitle).should('not.exist')
  });

  it('Should cancel deletion process successfully', () => {
    //Start to delete the issue, but cancel it
    cy.get('[data-testid="icon:trash"]').click();
    cy.contains('button', 'Cancel').click()
    //Assert that deletion confirmation dialogue is not visible
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    //Assert that issue is not deleted and still displayed on the Jira board
    cy.contains(issueTitle).should('be.visible')
  });
});
