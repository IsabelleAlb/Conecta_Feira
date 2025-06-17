import { useSQLiteContext } from 'expo-sqlite';

// Função para criar tabelas
export async function setupDatabase(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS lojas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_fantasia TEXT,
      cnpj TEXT UNIQUE,
      nome_dono TEXT,
      categoria_id INTEGER,
      email TEXT,
      senha TEXT,
      imagem_perfil TEXT,
      FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    );

    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      preco REAL,
      imagem TEXT,
      loja_id INTEGER,
      FOREIGN KEY (loja_id) REFERENCES lojas(id)
    );

    CREATE TABLE IF NOT EXISTS favoritos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      loja_id INTEGER UNIQUE,
      FOREIGN KEY (loja_id) REFERENCES lojas(id)
    );
  `);

    // Inserção das categorias fixas
    await db.runAsync(`
    INSERT OR IGNORE INTO categorias (nome) VALUES 
    ('Acessórios'),
    ('Decoração'),
    ('Gastronomia'),
    ('Moda'),
    ('Papelaria'),
    ('Produtos Naturais'),
    ('Outros');
`);
}



export async function buscarTodasCategorias(db) {
  return await db.getAllAsync('SELECT * FROM categorias;');
}

// --- Funções para LOJAS ---

export async function inserirLoja(db, nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil) {
  await db.runAsync(
    `INSERT INTO lojas 
      (nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil) 
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil]
  );
}

export async function buscarLojasPorNome(db, busca) {
  return await db.getAllAsync(
    'SELECT * FROM lojas WHERE nome_fantasia LIKE ?;',
    [`%${busca}%`]
  );
}

export async function buscarTodasLojas(db) {
  return await db.getAllAsync('SELECT * FROM lojas;');
}

export async function excluirLoja(db, id) {
  await db.runAsync('DELETE FROM lojas WHERE id = ?;', [id]);
}

export async function atualizarLoja(db, id, nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil) {
  await db.runAsync(
    `UPDATE lojas SET 
      nome_fantasia = ?, 
      cnpj = ?, 
      nome_dono = ?, 
      categoria_id = ?, 
      email = ?, 
      senha = ?, 
      imagem_perfil = ? 
     WHERE id = ?;`,
    [nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil, id]
  );
}

// --- Funções para PRODUTOS ---

export async function inserirProduto(db, nome, preco, imagem, loja_id) {
  await db.runAsync(
    'INSERT INTO produtos (nome, preco, imagem, loja_id) VALUES (?, ?, ?, ?);',
    [nome, preco, imagem, loja_id]
  );
}


export async function atualizarProduto(db, id, nome, preco, imagem) {
  await db.runAsync(
    'UPDATE produtos SET nome = ?, preco = ?, imagem = ? WHERE id = ?;',
    [nome, preco, imagem, id]
  );
}

export async function excluirProduto(db, id) {
  await db.runAsync('DELETE FROM produtos WHERE id = ?;', [id]);
}

// --- Funções para FAVORITOS ---

export async function adicionarFavorito(db, loja_id) {
  await db.runAsync(
    'INSERT OR IGNORE INTO favoritos (loja_id) VALUES (?);',
    [loja_id]
  );
}

export async function removerFavorito(db, loja_id) {
  await db.runAsync(
    'DELETE FROM favoritos WHERE loja_id = ?;',
    [loja_id]
  );
}


export async function ehFavorito(db, loja_id) {
  const result = await db.getAllAsync(
    'SELECT 1 FROM favoritos WHERE loja_id = ?;',
    [loja_id]
  );
  return result.length > 0;
}

// --- Hook para usar o banco de dados ---

export function useDatabase() {
  const db = useSQLiteContext();
  setupDatabase(db);
  return {
    db,
    // Categorias
        buscarTodasCategorias: () => buscarTodasCategorias(db),

    // Lojas
        inserirLoja: (nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil) => 
        inserirLoja(db, nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil),
        buscarLojasPorNome: (busca) => buscarLojasPorNome(db, busca),
        buscarTodasLojas: () => buscarTodasLojas(db),
        excluirLoja: (id) => excluirLoja(db, id),
        atualizarLoja: (id, nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil) => 
        atualizarLoja(db, id, nome_fantasia, cnpj, nome_dono, categoria_id, email, senha, imagem_perfil),

    // Produtos
        inserirProduto: (nome, preco, imagem, loja_id) => inserirProduto(db, nome, preco, imagem, loja_id),
        atualizarProduto: (id, nome, preco, imagem) => atualizarProduto(db, id, nome, preco, imagem),
        excluirProduto: (id) => excluirProduto(db, id),

    // Favoritos
        adicionarFavorito: (loja_id) => adicionarFavorito(db, loja_id),
        removerFavorito: (loja_id) => removerFavorito(db, loja_id),
        ehFavorito: (loja_id) => ehFavorito(db, loja_id),
  };
}
