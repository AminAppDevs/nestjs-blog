import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  //////// create category
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });
      if (category) {
        return { status: true, data: category };
      }
    } catch (error) {
      console.log(error);
    }
  }

  //////// get all category
  async findAll() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {}
  }

  //////// get category
  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({ where: { id } });
      return category;
    } catch (error) {}
  }
  //////// update category
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
      return { status: true, data: updatedCategory };
    } catch (error) {}
  }

  ///////// delete category
  async remove(id: number) {
    try {
      const deletedCategory = await this.prisma.category.delete({
        where: { id },
      });
      return { status: true, data: deletedCategory };
    } catch (error) {}
  }
}
