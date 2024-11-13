export abstract class AbstractApiHandler<T, ID> {
  public abstract findAll(): Promise<T[]>;
  public abstract save(entity: T): Promise<T>;
  public abstract delete(id: ID): Promise<void>;
}
