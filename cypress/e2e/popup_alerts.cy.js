describe('Lidando com Popups e Alerts', () => {
  beforeEach(() => {
    cy.visit('/Popup-Alerts/index.html')
  })

  // need to ensure the alert actually happens
  it('Javascript Alert', () => {
    cy.get('#button1').click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('I am an alert box!')
    })
  })

  // refactor to use cy.contains command
  // and confirm the dialog disappears when closed
  it('Modal Popup', () => {
    cy.get('#button2').click()
    // Removendo espaços em branco do início e do final da string
    cy.get('.modal-body')
      .invoke('text')
      .then((text) => {
        const txtEsperado =
          'We can inject and use JavaScript code if all else fails! Remember always try to use WebDriver Library method(s) first such as WebElement.click(). (The Selenium development team have spent allot of time developing WebDriver functions etc).'
        const txtNaPagina = text.trim()

        expect(txtNaPagina).to.equal(txtEsperado)
      })
    cy.get('.modal-content').find('.modal-footer').contains('Close').click()
  })

  // use a better selector for to click the ajax loader
  // confirm the loader is visible before checking that it does not exist
  // use precise network matcher for google analytics, otherwise everything matches
  // use cy.contains command
  // use precise selector for the close button
  // confirm the modal does not exist after closing it
  it('Outra maneira para o Modal Popup', () => {
    cy.intercept('/**').as('googleAnalytics')
    cy.get('p > a').click()
    cy.get('.loader').should('not.exist')
    cy.wait('@googleAnalytics')
    cy.get('#button1 > p').click()
    cy.get('.modal-body')
      .invoke('text')
      .then((text) => {
        const txtEsperado =
          'The waiting game can be a tricky one; this exercise will hopefully improve your understandings of the various types of waits.'
        const txtNaPagina = text.trim()

        expect(txtNaPagina).to.equal(txtEsperado)
      })
    cy.contains('Close').click()
  })
})
