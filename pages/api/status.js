function status(request, response){
  // response.status(200).send("Alunos do curso.dev são mais inteligentes"); // Enviar a resposta para API
  response.status(200).json({chave: "são a cima da media"}); // Tbm envia resposta para API usando charset=utf-8
}

export default status;
