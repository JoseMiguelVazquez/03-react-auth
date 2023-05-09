describe('Funcionalidad de Login', () => {
  it('Mi aplicación carga leyendo Home en /', () => {
    // 1. Arrange: Setup del estado de mi aplicación
    cy.visit('/')

    // 2. Act: Interactuar con la aplicacion o ejecutar acciones
    cy.get('h1')
      .contains('Home') // 3. Assert: Espero un resultado
  })

  it('Probar el Login como CUSTOMER', () => {
    // Interceptor lo uso para saber cuando una llamada a API es resuelta
    // y puedo esperarla en otro momento usando wait()
    cy.intercept('POST', 'http://localhost:3000/login').as('login')

    // Arrange
    cy.visit('/login')
    const email = 'drstrange@marvel.com'
    const password = 'multiverso'
    // Act
    cy.doLogin(email, password)

    cy.wait('@login')

    // Assert
    // cy.url().should('include', '/dashboard') UNA FORMA DE HACERLO
    cy.get('h1').contains('Dashboard')
  })
  it('Cuando haga Logout como ADMIN me lleve a la página de Home', () => {
    cy.intercept('POST', 'http://localhost:3000/login').as('login')

    // Arrange
    cy.visit('/login')

    // Act
    cy.doLogin('superman@dc.com', 'superman')
    cy.wait('@login')

    cy.get('nav > ul li:last').click()

    // Assert
    cy.get('h1').should('have.text', 'Home')
  })
})
