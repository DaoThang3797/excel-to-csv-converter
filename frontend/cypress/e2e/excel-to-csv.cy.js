describe('Excel to CSV Converter', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('http://localhost:3000')
  })

  it('should convert Excel file to CSV successfully', () => {
    // Test file path
    const fileName = 'demo2.xlsx'
    const filePath = 'demo2.xlsx'

    // Upload file by simulating drag and drop
    cy.get('[data-test="dropzone"]').attachFile(filePath, {
      subjectType: 'drag-n-drop',
      force: true
    })

    // Verify file is uploaded
    cy.get('[data-test="file-name"]')
      .should('be.visible')
      .and('contain', fileName)

    // Click convert button
    cy.get('[data-test="convert-button"]')
      .should('be.enabled')
      .click()

    // Wait for conversion to complete and success message
    cy.get('[data-test="success-message"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Chuyển đổi hoàn tất thành công!')

    // Ensure download button is enabled and verify its presence
    cy.get('[data-test="download-button"]')
      .should('be.visible')
      .should('be.enabled')
      .should('contain', 'Tải CSV')
  })

  it('should show error for invalid file format', () => {
    // Try to upload invalid file
    cy.get('[data-test="dropzone"]').attachFile('invalid.txt', {
      subjectType: 'drag-n-drop',
      force: true
    })

    // Verify error message
    cy.get('[data-test="error-message"]')
      .should('be.visible')
      .and('contain', 'Vui lòng chọn file Excel có định dạng .xlsx hoặc .xls')
  })
})
