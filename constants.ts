
import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 18.99,
    category: 'Fiction',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    coverImage: 'https://picsum.photos/seed/library/400/600',
    stock: 12,
    rating: 4.5
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 24.99,
    category: 'Self-Help',
    description: 'A supremely practical and useful guide. James Clear distills the most fundamental information about habit formation, so you can accomplish more by focusing on less.',
    coverImage: 'https://picsum.photos/seed/habits/400/600',
    stock: 50,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 22.50,
    category: 'Sci-Fi',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
    coverImage: 'https://picsum.photos/seed/hailmary/400/600',
    stock: 8,
    rating: 4.8
  },
  {
    id: '4',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 19.99,
    category: 'Finance',
    description: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people.',
    coverImage: 'https://picsum.photos/seed/money/400/600',
    stock: 15,
    rating: 4.7
  },
  {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 15.00,
    category: 'Sci-Fi',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    coverImage: 'https://picsum.photos/seed/dune/400/600',
    stock: 20,
    rating: 4.6
  }
];

export const CATEGORIES = ['All', 'Fiction', 'Self-Help', 'Sci-Fi', 'Finance', 'Biography', 'Mystery'];
