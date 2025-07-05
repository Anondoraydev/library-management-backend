"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gbp43.mongodb.net/booksDB?retryWrites=true&w=majority&appName=Cluster0`);
            console.log("Connected to MongoDB!");
            server = app_1.default.listen(PORT, () => {
                console.log(`App is listening on port ${PORT}`);
            });
            // Optional: Handle graceful shutdown
            process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
                console.log("SIGINT received. Closing server...");
                yield mongoose_1.default.disconnect();
                server.close(() => {
                    console.log("Server closed.");
                    process.exit(0);
                });
            }));
        }
        catch (error) {
            console.error("Failed to start the server:", error.message);
            process.exit(1);
        }
    });
}
main();
