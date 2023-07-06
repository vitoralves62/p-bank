import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    // Defina as opções específicas do MySQL aqui, se necessário
  },
  logging: false,
  define: {
    timestamps: true,
  },
  timezone: '-03:00',
});

const db = {};

// Carregar os modelos
const modelModules = [
  import('./user.js'),
  import('./roles.js'),
  import('./permissions.js'),
  import('./roles_permissions.js'),
  import('./users_permissions.js'),
  import('./users_roles.js')
  // adicione outros modelos aqui, se houver
];

// Inicializar os modelos
Promise.all(modelModules)
  .then((modules) => {
    for (const module of modules) {
      const modelDefiner = module.default;
      const model = modelDefiner(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }

    // Estabelecer associações entre modelos, se houver
    for (const modelName of Object.keys(db)) {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    }
  })
  .catch((error) => {
    console.error('Erro ao carregar modelos:', error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
