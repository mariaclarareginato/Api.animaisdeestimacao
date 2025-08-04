import express from 'express';
import db from './db.js';

const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send('Página inícial.')
});

// Listar 

app.get('/animais', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM animais');
        res.json(rows);
    } catch (err){
        console.error(err);
        res.status(500).send('Erro ao obter os animais de estimação.')
    }
});


// Exibir por ID

app.get('/animais/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido. infelizmente.'})
  } 

  try {
    const [rows] = await db.query('SELECT * FROM animais WHERE id = ?', [id]);
    const animal = rows[0];
  
  if (animal) {
    res.json(animal);
  } else {
    res.status(404).json({ message : 'Animal não foi encontrado.'})
  }  
} catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar animal.')
}
});



// Criar animal 

app.post('/animais', async (req, res) => {
    const {tipo, raca, nome, cuidadosecaracteristicas} = req.body;
    try {
        const [result] = await db.query(`INSERT INTO animais (tipo, raca, nome, cuidadosecaracteristicas) VALUES (?, ?, ?, ?)`, [tipo, raca, nome, cuidadosecaracteristicas]);
        res.status(201).json({id: result.insertId, tipo, raca, nome, cuidadosecaracteristicas});
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar animal de estimação.')
    }
});


// Atualizar animal

app.put('/animais/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo, raca, nome, cuidadosecaracteristicas } = req.body;

  try {
    const [result] = await db.query('UPDATE animais SET tipo = ?, raca = ?, nome = ?, cuidadosecaracteristicas = ? WHERE id = ?',[tipo, raca, nome, cuidadosecaracteristicas, id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ id, tipo, raca, nome, cuidadosecaracteristicas });
    } else {
      res.status(404).send('Animal de estimação não encontrado.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar o animal de estimação.');
  }
});



// Excluir animal

app.delete('/animais/:id', async (req, res) => {
const { id } = req.params;
try {
  const [result] = await db.query('DELETE FROM animais WHERE id = ?', [id]);
  if (result.affectedRows > 0) {
    res.status(204).send();
  } else {
    res.status(404).send('Animal de estimação não encontrado.');
  }
} catch (err) {
  console.error(err);
  res.status(500).send('Erro ao deletar o animal de estimação.')
}
});




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});