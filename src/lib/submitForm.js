export async function submitForm(formName, fields, subject) {
  const body = new URLSearchParams()
  body.set('form-name', formName)
  body.set('subject', subject)
  body.set('bot-field', '')
  for (const [key, value] of Object.entries(fields)) {
    body.set(key, value ?? '')
  }

  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  const text = await response.text()
  // The dev server answers this POST with the skeleton file itself. Netlify's
  // form handler answers with its thank-you page, which does not contain the
  // hidden forms. Treat the skeleton echo as "not accepted".
  const echoedSkeleton = text.includes('data-netlify="true"') && text.includes('name="form-name"')

  if (!response.ok || echoedSkeleton) {
    throw new Error('Form submission failed')
  }
}
