import { CreateUser } from "../../../useCases/user/CreateUser.useCase";
import { describe, it, expect, beforeEach } from "vitest";
import {
  createMockUow,
  createMockHasher,
  createMockNotificationService,
} from "../../utility/mock-factory";

describe("CreateUser", () => {
  let sut: CreateUser;
  let mockUow: any;
  let mockHasher: any;
  let mockNotify: any;

  beforeEach(() => {
    mockUow = createMockUow();
    mockHasher = createMockHasher();
    mockNotify = createMockNotificationService();

    sut = new CreateUser(mockUow, mockHasher, mockNotify);
  });

  it("should call the repository with the hashed password", async () => {
    const dto = {
      name: "Mohab",
      email: "example@gmail.com",
      password: "123",
      role: "USER" as any,
    };

    const expectedSavedUser = {
      id: "tempId",
      ...dto,
      password: "hashed_value",
    };

    mockUow.userRepo.saveNewUser.mockResolvedValue(expectedSavedUser);

    await sut.execute(dto);

    const savedUser = mockUow.userRepo.saveNewUser.mock.calls[0][0];
    expect(mockHasher.hash).toHaveBeenCalledWith("123");
    expect(savedUser.password).toBe("hashed_value");
  });
});
