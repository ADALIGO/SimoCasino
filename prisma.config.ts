const config = {
  schema: './prisma/schema.prisma',
  datasource: {
    db: {
      provider: 'mongodb',
      url: process.env.DATABASE_URL,
    },
  },
};

export default config;

