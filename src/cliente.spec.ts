import { Test, TestingModule } from '@nestjs/testing';
import { Cliente } from './cliente';

describe('Cliente', () => {
  let provider: Cliente;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Cliente],
    }).compile();

    provider = module.get<Cliente>(Cliente);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
