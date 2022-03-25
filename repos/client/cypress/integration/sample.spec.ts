describe('add', () => {
  it('1 + 1 = 2', () => {
    expect(1 + 1).to.equal(2)
  })
})

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('visits the app root url', () => {
    cy.findByText(/Hello Vite \+ React!/i).should('exist')
  })
  it('should increment count on click', () => {
    cy.findByText(/count is: 0/i).should('exist')
    cy.findByRole('button').click()
    cy.findByText(/count is: 1/i).should('exist')
    cy.findByRole('button').click()
    cy.findByText(/count is: 2/i).should('exist')
  })
})
