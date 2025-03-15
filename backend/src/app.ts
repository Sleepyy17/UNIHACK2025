import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config.json';
import { auth } from './middleware/auth';
import { getData, loadDataStore, saveDataStore } from './dataStore';
import * as authController from './controllers/auth';
import * as userController from './controllers/user';
import * as groupController from './controllers/group';
import * as standupController from './controllers/standup';
import * as blockerController from './controllers/blocker';
import * as aiChatController from './controllers/aiChat';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { resetToDefault } from './controllers/admin';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Swagger UI setup
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'CrunchTime API Documentation'
}));

const PORT: number = parseInt(process.env.PORT || config.port.toString());
const HOST: string = process.env.IP || 'localhost';

// Health check
app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'CrunchTime API is running' });
});

// Auth routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// User routes
app.get('/api/users/me', auth, userController.getProfile);

// Group routes
app.post('/api/groups/create', auth, groupController.createGroup);
app.post('/api/groups/:groupId/addMember', auth, groupController.addMember);
app.get('/api/groups/:groupId', auth, groupController.getGroupInfo);

// Standup routes
app.post('/api/standups/log', auth, standupController.logStandup);
app.put('/api/standups/:logId/edit', auth, standupController.editStandup);
app.delete('/api/standups/:logId', auth, standupController.deleteStandup);
app.get('/api/standups/:groupId', auth, standupController.getGroupStandups);

// Group summary routes
app.get('/api/summary/:groupId', auth, groupController.generateSummary);

// Blocker routes
app.post('/api/blockers/add', auth, blockerController.addBlocker);
app.put('/api/blockers/:blockerId/resolve', auth, blockerController.resolveBlocker);
app.get('/api/blockers/:groupId', auth, blockerController.listActiveBlockers);

// AI routes
app.post('/api/chat/standup', auth, aiChatController.chatWithAI);

// Admin routes
app.post('/reset', resetToDefault);


// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, HOST, () => {
    loadDataStore();
    console.log(`⚡️ CrunchTime server started on http://${HOST}:${PORT}/`);
    console.log(`📚 API Documentation available at http://${HOST}:${PORT}/api-docs`);
});
  
