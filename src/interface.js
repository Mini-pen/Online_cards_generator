
// EXTENSION DES IFRAMES AU SURVOL

function activate (domElement) {
  domElement.width = '90%'
  domElement.height = '700px'
}

function desactivate (domElement) {
  domElement.width = '30%'  // Augmenté de 5% à 30%
  domElement.height = '400px'  // Augmenté de 250px à 400px
}

// Fonctions désactivées - layout fixe
// function activateCalc (frameCalc, frameSvg) {
//   activate(frameCalc)
//   desactivate(frameSvg)
// }

// function activateSvg (frameCalc, frameSvg) {
//   activate(frameSvg)
//   desactivate(frameCalc)
// }

export default function setFrames () {
  const frameCalc = document.getElementById('calcPage')
  const contentDisplay = document.getElementById('contentDisplay')

  // Comportement de repli désactivé - les éléments gardent leur taille fixe
  // frameCalc.addEventListener('mouseover', function () { activateCalc(frameCalc, frameSvg) })
  // frameSvg.addEventListener('mouseover', function () { activateSvg(frameCalc, frameSvg) })
  
  // Taille fixe pour les éléments - layout 50/50
  if (frameCalc) {
    frameCalc.width = '100%'
    frameCalc.height = '500px'
  }
  
  if (contentDisplay) {
    contentDisplay.style.width = '100%'
    contentDisplay.style.height = '100%'
  }
}

