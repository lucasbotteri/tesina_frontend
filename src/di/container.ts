import { Container } from 'inversify';
import 'reflect-metadata';
import SERVICE_IDENTIFIER from '@/di/Identifier';
import Service from '@/interface/Service';

import LelSymbolService from '@/service/LelSymbol';
import LelSymbol from '@/model/LelSymbol';

const container: Container = new Container();

container.bind<Service<LelSymbol>>(SERVICE_IDENTIFIER.SERVICE).to(LelSymbolService);

export default container;
