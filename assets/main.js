const {
  ipcRenderer
} = require('electron')
document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('DOMContentLoaded')
  console.log('sent')
  ipcRenderer.on('sqlite3data', (e, data) => {
    console.log('received')
    const dataEL = document.getElementById('data')
    let innerHTML = data.reduce((accumulator, rec) => {
      accumulator += `
      <tr>
        <td>${rec.id}</td>
        <td>${rec.simplified}</td>
        <td>${rec.traditional}</td>
      </tr>`
      return accumulator
    }, '<table><tbody>')
    innerHTML += '</tbody></table>'
    console.log(innerHTML)
    dataEL.innerHTML = innerHTML
  })
})
