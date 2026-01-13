@extends('layouts.app')

@section('title', 'Edit Team: ' . $team->name)

@section('content')
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-header bg-warning text-dark">
                    <h4 class="mb-0">
                        <i class="bi bi-pencil me-2"></i>Edit Team: {{ $team->name }}
                    </h4>
                </div>
                <div class="card-body">
                    <form action="{{ route('teams.update', $team) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        
                        <div class="mb-3">
                            <label for="name" class="form-label">Team Name *</label>
                            <input type="text" class="form-control @error('name') is-invalid @enderror" 
                                   id="name" name="name" value="{{ old('name', $team->name) }}" required>
                            @error('name')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" name="description" 
                                      rows="3">{{ old('description', $team->description) }}</textarea>
                        </div>
                        
                        <div class="mb-3">
                            <label for="logo" class="form-label">Team Logo</label>
                            
                            @if($team->logo)
                            <div class="mb-2">
                                <img src="{{ asset($team->logo) }}" alt="Current logo" 
                                     class="img-thumbnail" style="max-height: 100px;">
                                <br>
                                <small>Current logo</small>
                            </div>
                            @endif
                            
                            <input type="file" class="form-control" id="logo" name="logo" accept="image/*">
                            <small class="text-muted">Leave empty to keep current logo. Max size: 2MB</small>
                        </div>
                        
                        <div class="mb-4">
                            <label class="form-label">Select Blowers</label>
                            <select name="blowers[]" class="form-select" multiple size="5">
                                @foreach($blowers as $blower)
                                <option value="{{ $blower->id }}" 
                                    {{ $team->blowers->contains($blower->id) ? 'selected' : '' }}>
                                    {{ $blower->name }} {{ $blower->surname }}
                                </option>
                                @endforeach
                            </select>
                            <small class="text-muted">Hold Ctrl/Cmd to select multiple</small>
                        </div>
                        
                        <div class="d-flex justify-content-between">
                            <a href="{{ route('teams.show', $team->slug) }}" class="btn btn-secondary">
                                <i class="bi bi-arrow-left me-2"></i>Cancel
                            </a>
                            <div>
                                <button type="submit" class="btn btn-warning">
                                    <i class="bi bi-save me-2"></i>Update Team
                                </button>
                                <a href="{{ route('teams.index') }}" class="btn btn-outline-primary">
                                    Back to Teams
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection