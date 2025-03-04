describe('Delete Contact', () => {
    beforeEach(() => {
      cy.visit('https://localhost:51308/contacts');
    });
  
    it('should delete a contact and correctly handle an empty table', () => {
      // Check if the table has contacts before deleting
      cy.get('table tbody')
        .then(($tbody) => {
          if ($tbody.find('tr').length === 0) {
            cy.log('No contacts available to delete!');
            return;
          }
  
          // Store initial row count
          const initialRowCount = $tbody.find('tr').length;
          cy.log(`Initial row count: ${initialRowCount}`);
  
          // Click the delete button for the first contact in the list
          cy.get('table tbody tr')
            .first()
            .within(() => {
              // cy.get('button.p-button-warning').click(); 
              cy.get('#delete-contact-btn').click(); 
            });
  
          // Wait for UI update
          cy.wait(1000);
  
          // Check if `tbody` still exists
          cy.get('table tbody').then(($newTbody) => {
            if ($newTbody.length === 0) {
              cy.log('All contacts deleted! Table is now empty.');
              cy.get('table tbody').should('not.exist'); // ✅ Confirm tbody is gone
            } else {
              // Get updated row count and ensure it's decreased
              const newRowCount = $newTbody.find('tr').length;
              cy.log(`New row count: ${newRowCount}`);
              expect(newRowCount).to.be.lessThan(initialRowCount);
            }
          });
  
          cy.get('.toast-success').should('contain', 'Contact deleted successfully!');
        });
    });
  });
  