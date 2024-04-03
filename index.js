let participantes = [
  {
    nome: 'pedro',
    email: 'pedrozip@yahoo.com',
    dataInscricao: new Date(2024, 2, 15, 1),
    dataCheckIn: null
  },
  {
    nome: 'jonathan',
    email: 'jonathanR@gmail.com',
    dataInscricao: new Date(2024, 2, 20, 12),
    dataCheckIn: new Date(2024, 3, 1, 20)
  },
  {
    nome: 'maria',
    email: 'maria22@hotmail.com',
    dataInscricao: new Date(2024, 2, 18, 14),
    dataCheckIn: null
  },
  {
    nome: 'ana',
    email: 'ana87@gmail.com',
    dataInscricao: new Date(2024, 2, 19, 9),
    dataCheckIn: null
  },
  {
    nome: 'lucas',
    email: 'lucas09@outlook.com',
    dataInscricao: new Date(2024, 2, 16, 16),
    dataCheckIn: new Date(2024, 3, 1, 23)
  },
  {
    nome: 'carla',
    email: 'carla3@yahoo.com',
    dataInscricao: new Date(2024, 2, 17, 10),
    dataCheckIn: new Date(2024, 3, 2, 0)
  },
  {
    nome: 'gabriel',
    email: 'gabriel_34@gmail.com',
    dataInscricao: new Date(2024, 2, 21, 8),
    dataCheckIn: null
  },
  {
    nome: 'sara',
    email: 'sara11@outlook.com',
    dataInscricao: new Date(2024, 2, 22, 18),
    dataCheckIn: new Date(2024, 3, 2, 2)
  },
  {
    nome: 'thiago',
    email: 'thiago55@hotmail.com',
    dataInscricao: new Date(2024, 2, 23, 11),
    dataCheckIn: new Date(2024, 3, 2, 3)
  },
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button data-email="${participante.email}"
    onclick="fazerCheckIn(event)">
      Confirmar check-in
    </button>`
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let data = "";
  participantes.forEach((participante) => {
    data = data + criarNovoParticipante(participante)
  })
  document.querySelector('tbody')
    .innerHTML = data;
}
atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // confirmar existencia de participante.
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes);

  // limpar o furmulario
  event.target
  .querySelector('[name="nome"]')
  .value = ""; // limpou o campo de nome

  event.target
  .querySelector('[name="email"]')
  .value = ""; // limpou o campo de email
}

const fazerCheckIn = (event) => {

  // confirmar se quer fazer check-in

  if(confirm("Confirmar Check-in?") == true){
  
    // encontrar o participante dentro da lista
    const participante = participantes.find((p)=>{
    return p.email == event.target.dataset.email
    })

    participante.dataCheckIn = new Date();
  }
  atualizarLista(participantes)
}