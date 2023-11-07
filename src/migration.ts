import { migration } from "./db/migration";
import Book from "./models/book.model";
import Borrow from "./models/borrow.model";
import RefreshToken from "./models/refreshToken.model";
import Row from "./models/rows.model";
import Section from "./models/sections.model";
import User from "./models/user.model";

migration([
    User,
    RefreshToken,
    Section,
    Row,
    Book,
    Borrow
])