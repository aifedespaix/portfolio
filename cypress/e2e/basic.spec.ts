describe('navigation de base', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('devrait afficher correctement le header', () => {
    cy.get('header').should('be.visible')
  })

  it('devrait afficher correctement le menu', () => {
    cy.get('nav').should('be.visible')
  })

  it('devrait afficher correctement le footer', () => {
    cy.get('footer').should('be.visible')
  })

  it('devrait avoir des liens fonctionnels dans le footer', () => {
    cy.get('footer a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href')
    })
  })
})
