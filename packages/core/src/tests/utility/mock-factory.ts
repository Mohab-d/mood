import { vi } from "vitest";
import { IHasher } from "../../interfaces/IHasher.interface";
import { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";

export const createMockUow = () =>
  ({
    userRepo: {
      saveNewUser: vi.fn(),
      fetchAllUsers: vi.fn(),
      fetchUserById: vi.fn(),
    },
    orderRepo: {},
    itemRepo: {},
  }) as unknown as IUnitOfWork;

export const createMockHasher = (): IHasher => ({
  hash: vi.fn().mockResolvedValue("hashed_value"),
  compare: vi.fn().mockResolvedValue(true),
});

export const createMockNotificationService = (): IMoodNotificationService => ({
  publish: vi.fn(),
  subscribe: vi.fn(),
});
