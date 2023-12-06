import database from 'infra/database.js';

async function status(request, response){
  const updatedAt = new Date().toISOString(); // Pega da data atual no formato ISO 8601

  response.status(200).json({
    updated_at: updatedAt,
  }); // Tbm envia resposta para API usando charset=utf-8
}

export default status;
