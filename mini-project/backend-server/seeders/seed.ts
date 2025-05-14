import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    // Hash passwords
    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("password456", 10);

    // Seed Users
    const users = [
      {
        id: uuidv4(),
        fullname: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        phoneNumber: "1234567890",
        password: hashedPassword1,
        role: "admin",
        active: true,
        data: JSON.stringify({ preferences: { theme: "dark" } }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        fullname: "Jane Smith",
        username: "janesmith",
        email: "janesmith@example.com",
        phoneNumber: "0987654321",
        password: hashedPassword2,
        role: "user",
        active: true,
        data: JSON.stringify({ preferences: { theme: "light" } }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", users);

    // Seed Courses
    const courses = [
      {
        id: uuidv4(),
        code: "COURSE001",
        title: "Introduction to Programming",
        description: "Learn the basics of programming.",
        order: 1,
        data: JSON.stringify({ duration: "4 weeks", level: "beginner" }),
        tag: "programming",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "COURSE002",
        title: "Advanced JavaScript",
        description: "Deep dive into JavaScript.",
        order: 2,
        data: JSON.stringify({ duration: "6 weeks", level: "advanced" }),
        tag: "javascript",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Courses", courses);

    // Seed Tryout Sections
    const tryoutSections = [
      {
        id: uuidv4(),
        code: "SECTION001",
        title: "Math Section",
        description: "Test your math skills.",
        order: 1,
        data: JSON.stringify({ questions: 20, duration: "30 minutes" }),
        tag: "math",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        code: "SECTION002",
        title: "English Section",
        description: "Test your English skills.",
        order: 2,
        data: JSON.stringify({ questions: 25, duration: "40 minutes" }),
        tag: "english",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("tryout_sections", tryoutSections);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Users", {}, {});
    await queryInterface.bulkDelete("Courses", {}, {});
    await queryInterface.bulkDelete("tryout_sections", {}, {});
  },
};
