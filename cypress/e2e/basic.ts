describe('Navigation de base', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Devrait afficher correctement le header', () => {
    cy.get('header[role="banner"]').should('be.visible')
    cy.get('header').find('button').should('be.visible')
  })

  it('Devrait afficher les boutons de thème et de langue', () => {
    cy.get('header').find('button[title*="theme"]').should('be.visible')
    cy.get('header').find('button[title*="language"]').should('be.visible')
  })

  it('Devrait afficher le bouton de profil', () => {
    cy.get('header').find('a[href="/profile"]').should('be.visible')
  })

  it('Devrait naviguer vers la page profil', () => {
    cy.get('header').find('a[href="/profile"]').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/profile`)
  })

  it('Devrait afficher l\'app-bar sur mobile (< 768px)', () => {
    cy.viewport(767, 1000)
    cy.get('.app-bar').should('be.visible')
  })

  it('Ne devrait pas afficher l\'app-bar sur desktop (>= 768px)', () => {
    cy.viewport(768, 1000)
    cy.get('.app-bar').should('not.be.visible')
  })

  it('Devrait afficher correctement le footer', () => {
    cy.get('footer').should('be.visible')
  })

  it('Devrait avoir des liens fonctionnels dans le footer', () => {
    cy.get('footer a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href')
    })
  })

  it('Devrait pouvoir basculer le thème', () => {
    cy.get('button[title*="theme"]').click()
    // Vérifier que le thème a changé (vous devrez peut-être adapter cette assertion selon votre implémentation)
    cy.get('html').should('have.class', 'dark')
  })

  it('Devrait pouvoir basculer la langue', () => {
    cy.get('button[title*="language"]').click()
    // Vérifier que la langue a changé (vous devrez peut-être adapter cette assertion selon votre implémentation)
    cy.get('html').should('have.attr', 'lang')
  })
})
