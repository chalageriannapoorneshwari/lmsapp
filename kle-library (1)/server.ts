import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  isbn: string;
  coverImage?: string;
}

let books: Book[] = [
  {
    id: "1",
    title: "The C Programming Language",
    author: "Brian Kernighan & Dennis Ritchie",
    category: "Computer Science",
    year: 1978,
    isbn: "978-0131103627",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    year: 2008,
    isbn: "978-0132350884",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "3",
    title: "Physics of the Future",
    author: "Michio Kaku",
    category: "Physics",
    year: 2011,
    isbn: "978-0385530804",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "4",
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Astronomy",
    year: 1980,
    isbn: "978-0345331359",
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "5",
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    category: "Finance",
    year: 1949,
    isbn: "978-0060555665",
    coverImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "6",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    year: 2011,
    isbn: "978-0062316097",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "7",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    year: 2011,
    isbn: "978-0374275631",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "8",
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    year: 1997,
    isbn: "978-0393038910",
    coverImage: "https://images.unsplash.com/photo-1464938334413-58079a40590e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "9",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Biology",
    year: 1976,
    isbn: "978-0192860927",
    coverImage: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "10",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    year: 2014,
    isbn: "978-0804139298",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "11",
    title: "Brief Answers to the Big Questions",
    author: "Stephen Hawking",
    category: "Science",
    year: 2018,
    isbn: "978-1473695986",
    coverImage: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "12",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    category: "Software Engineering",
    year: 1999,
    isbn: "978-0201616224",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "13",
    title: "Origin of Species",
    author: "Charles Darwin",
    category: "Biology",
    year: 1859,
    isbn: "978-0140432053",
    coverImage: "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "14",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    year: 1997,
    isbn: "978-1612680194",
    coverImage: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "15",
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    category: "Biography",
    year: 2016,
    isbn: "978-0812988406",
    coverImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "16",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    year: 2011,
    isbn: "978-0307887894",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "17",
    title: "Design for the Real World",
    author: "Victor Papanek",
    category: "Design",
    year: 1971,
    isbn: "978-0500273586",
    coverImage: "https://images.unsplash.com/photo-1501501178405-a9623fe217a0?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "18",
    title: "The Republic",
    author: "Plato",
    category: "Philosophy",
    year: -375,
    isbn: "978-0140449143",
    coverImage: "https://images.unsplash.com/photo-1544648397-52e9dd677ba4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "19",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    year: 2011,
    isbn: "978-1451648539",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "20",
    title: "Freakonomics",
    author: "Steven D. Levitt & Stephen J. Dubner",
    category: "Economics",
    year: 2005,
    isbn: "978-0060731328",
    coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "21",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    category: "Computer Science",
    year: 1995,
    isbn: "978-0136042594",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "22",
    title: "Molecular Biology of the Cell",
    author: "Bruce Alberts",
    category: "Biology",
    year: 1983,
    isbn: "978-0815344322",
    coverImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "23",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    category: "Economics",
    year: 1997,
    isbn: "978-1305585126",
    coverImage: "https://images.unsplash.com/photo-1611974717483-586bc542a67e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "24",
    title: "The Feynman Lectures on Physics",
    author: "Richard Feynman",
    category: "Physics",
    year: 1963,
    isbn: "978-0465023820",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "25",
    title: "Psychology: Themes and Variations",
    author: "Wayne Weiten",
    category: "Psychology",
    year: 2016,
    isbn: "978-1305495371",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "26",
    title: "General Chemistry",
    author: "Linus Pauling",
    category: "Chemistry",
    year: 1947,
    isbn: "978-0486656229",
    coverImage: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "27",
    title: "Calculus",
    author: "James Stewart",
    category: "Mathematics",
    year: 1987,
    isbn: "978-1285740621",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd482100c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "28",
    title: "A History of Western Philosophy",
    author: "Bertrand Russell",
    category: "Philosophy",
    year: 1945,
    isbn: "978-0671201586",
    coverImage: "https://images.unsplash.com/photo-1544648397-52e9dd677ba4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "29",
    title: "Macroeconomics",
    author: "Olivier Blanchard",
    category: "Economics",
    year: 1997,
    isbn: "978-0133451733",
    coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "30",
    title: "Organic Chemistry",
    author: "T.W. Graham Solomons",
    category: "Chemistry",
    year: 1976,
    isbn: "978-1118133576",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9d39d662b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "31",
    title: "Introduction to Electrodynamics",
    author: "David J. Griffiths",
    category: "Physics",
    year: 1981,
    isbn: "978-0321856562",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "32",
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "Computer Science",
    year: 1981,
    isbn: "978-0132126953",
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "33",
    title: "The Art of Computer Programming",
    author: "Donald Knuth",
    category: "Computer Science",
    year: 1968,
    isbn: "978-0201896831",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "34",
    title: "Discrete Mathematics",
    author: "Kenneth H. Rosen",
    category: "Mathematics",
    year: 1988,
    isbn: "978-0073383095",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd482100c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "35",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    category: "Career",
    year: 2008,
    isbn: "978-0984782857",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "36",
    title: "Introduction to Topology",
    author: "Bert Mendelson",
    category: "Mathematics",
    year: 1962,
    isbn: "978-0486663524",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd482100c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "37",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Design",
    year: 1988,
    isbn: "978-0465050659",
    coverImage: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "38",
    title: "Sociology: A Brief Introduction",
    author: "Richard T. Schaefer",
    category: "Sociology",
    year: 2004,
    isbn: "978-0078026720",
    coverImage: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "39",
    title: "International Relations",
    author: "Joshua S. Goldstein",
    category: "Political Science",
    year: 2001,
    isbn: "978-0205971466",
    coverImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "40",
    title: "Biostatistics",
    author: "Wayne W. Daniel",
    category: "Biology",
    year: 1974,
    isbn: "978-1118302798",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9d39d662b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "41",
    title: "The Art of Racing in the Rain",
    author: "Garth Stein",
    category: "Literature",
    year: 2008,
    isbn: "978-0061537967",
    coverImage: "https://images.unsplash.com/photo-1544648397-52e9dd677ba4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "42",
    title: "F1 Technology",
    author: "Peter Wright",
    category: "Engineering",
    year: 2001,
    isbn: "978-1859604111",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "43",
    title: "The Speed of Trust",
    author: "Stephen M.R. Covey",
    category: "Leadership",
    year: 2006,
    isbn: "978-1416549000",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "44",
    title: "Total Competition",
    author: "Ross Brawn & Adam Parr",
    category: "Strategy",
    year: 2016,
    isbn: "978-1473648500",
    coverImage: "https://images.unsplash.com/photo-1493238792040-d71077ee4f2e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "45",
    title: "How to Build a Car",
    author: "Adrian Newey",
    category: "Autobiography",
    year: 2017,
    isbn: "978-0008196806",
    coverImage: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "46",
    title: "The Second Machine Age",
    author: "Erik Brynjolfsson",
    category: "Economics",
    year: 2014,
    isbn: "978-0393239355",
    coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "47",
    title: "Life 3.0",
    author: "Max Tegmark",
    category: "Technology",
    year: 2017,
    isbn: "978-1101946596",
    coverImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "48",
    title: "The Master Algorithm",
    author: "Pedro Domingos",
    category: "Computer Science",
    year: 2015,
    isbn: "978-0465065707",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd482100c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "49",
    title: "Range",
    author: "David Epstein",
    category: "Social Science",
    year: 2019,
    isbn: "978-0735214484",
    coverImage: "https://images.unsplash.com/photo-1544648397-52e9dd677ba4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "50",
    title: "Hit Refresh",
    author: "Satya Nadella",
    category: "Business",
    year: 2017,
    isbn: "978-0062652508",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/books", (req, res) => {
    res.json(books);
  });

  app.post("/api/books", (req, res) => {
    const newBook = { ...req.body, id: Date.now().toString() };
    books.push(newBook);
    res.status(201).json(newBook);
  });

  app.put("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
      books[index] = { ...books[index], ...req.body, id };
      res.json(books[index]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });

  app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id !== id);
    res.status(204).send();
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
