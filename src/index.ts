import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Contact } from './entity/Contact';
import { validate } from 'class-validator';

const app = express();
const port = 3000;

app.use(express.json());

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => console.log('Error during DataSource initialization:', error));

// POST route to handle contact form submission
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // Validate the incoming data
  const contact = new Contact(name, email, message);
  const errors = await validate(contact);

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map((err) => err.toString()) });
  }

  // Save the contact form data to the database
  try {
    await AppDataSource.manager.save(contact);
    res.status(201).json({
      message: 'Contact form submitted successfully',
      contactId: contact.contactId,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit contact form', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
