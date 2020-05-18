import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipesUpdateSubscription: Subscription;
  recipes: Recipe[] = [];

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recipesUpdateSubscription = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[])=>{
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesUpdateSubscription.unsubscribe();

  }

  onClickNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

}
