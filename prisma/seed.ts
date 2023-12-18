import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

const FAKE_USERS_AMOUNT: number = 20;
const FAKE_TASKS_AMOUNT: number = 60;

async function main() {
  /**
   * Populate the user db table with mock users.
   */
  const addUsers = async () => {
    const mockUserFn = (): Prisma.UserCreateManyInput => ({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
    });
  
    const usersToCreateData: Prisma.UserCreateManyInput[] = new Array(FAKE_USERS_AMOUNT)
      .fill(null)
      .map(mockUserFn);

      await prisma.user.createMany({
        data: usersToCreateData,
      });
  };

  /**
   * Populate the task db table with mock tasks.
   */
  const addTasks = async () => {
    const select: Prisma.UserSelect = {
      id: true,
    };
    const authorIds = (await prisma.user.findMany({
      select,
    })).map(authorObj => authorObj.id);

    const mockTaskFn = (): Prisma.TaskCreateManyInput => ({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      isDone: faker.helpers.arrayElement([true, false]),
      authorId: faker.helpers.arrayElement(authorIds),
    });
  
    const tasksToCreateData: Prisma.TaskCreateManyInput[] = new Array(FAKE_TASKS_AMOUNT)
      .fill(null)
      .map(mockTaskFn);

      await prisma.task.createMany({
        data: tasksToCreateData,
      });
  };

  await prisma.user.deleteMany();
  await prisma.task.deleteMany();

  await addUsers();
  await addTasks();
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅  Database successfully seeded');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
